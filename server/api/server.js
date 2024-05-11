import fs from "fs/promises";
import PriorityQueue from "js-priority-queue";

let links = [];

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

async function getUrlForFile(filename) {
  const fileToUrl = JSON.parse(
    await fs.readFile("./server/util/fileToUrl.json", "utf-8")
  );
  return fileToUrl[filename];
}


const getURLs = async (query) => {
  try {
    
    const  data = await fs.readFile("./part-r-00000", "utf8");
    const lines = data.split("\n");
    const words = query.split(" ");

    const urlsAndFrequencies = new PriorityQueue({
      comparator: (a, b) => b.tfIdf - a.tfIdf,
    });

    const urlSet = new Set();

    for (const word of words) {
      const escapedWord = escapeRegExp(word);
      const regex = new RegExp(`(^|\\s)${escapedWord}(?=\\s|$)`, "gu");
      const results = lines.filter((line) => regex.test(line));

      for (const result of results) {
        const [foundWord, urls] = result.split("\t");
        const urlsArray = urls.split(";");
        let totalDocuments = urlsArray.length + 1;

        let totalFrequency = 0;
        urlsArray.forEach((url) => {
          const [filename, frequency, totalWords] = url.split(":");
          totalFrequency += parseInt(frequency, 10);
        });

        urlsArray.forEach((url) => {
          const [filename, frequency, totalWords] = url.split(":");
          const tf = parseInt(frequency, 10) / parseInt(totalWords, 10);
          const idf = Math.log(totalDocuments / totalFrequency);
          const tfIdf = tf * idf;
          urlsAndFrequencies.queue({
            url: filename,
            tfIdf,
          });
        });
      }
    }

    while (urlsAndFrequencies.length > 0) {
      const urlObj = urlsAndFrequencies.dequeue();
      const urlWithFile = await getUrlForFile(urlObj.url + ".txt");

      if (!urlSet.has(urlWithFile)) {
        console.log(`URL: ${urlWithFile} TF-IDF: ${urlObj.tfIdf}`);
        links.push(urlWithFile);
        urlSet.add(urlWithFile);
      }
    }
  } catch (err) {
    console.error(err);
    console.log("An error occurred while reading the file.");
  }
};

export default defineEventHandler(async (event) => {
  const { value } = getQuery(event);
  if (!value) {
    return {
      links: [],
    };
  }
  links = [];
  await getURLs(value.toLowerCase());

  return {
    links: links,
  };
});
