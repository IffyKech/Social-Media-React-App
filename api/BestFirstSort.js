/**
 *
 * @param {string} searchQuery - text query submitted through search box
 * @param {Array} dataToSort - array of post data to sort
 * @return {Array} - sorted array of posts data
 * @constructor
 */
export default function BestFirstSort(searchQuery, dataToSort) {
    const wordsInQuery = searchQuery.split(" "); // split the query to an array

    if (dataToSort.length < 1) {
        return dataToSort;
    }

    // calculate matches
    for (let i=0; i < dataToSort.length; i++) { // for each data item in dataToSort
        let relevanceScore = 0; // init relevance score
        let wordsMatchedWithFilter = 0;
        let wordsMatchedWithTitle = 0;

        const wordsInTitle = dataToSort[i].post_title.split(" ");
        const wordsInFilter = dataToSort[i].tag_name.split("-");

        const numberOfWordsInTitle = wordsInTitle.length;
        const numberOfWordsInFilter = wordsInFilter.length;

        for (let queryWord=0; queryWord < wordsInQuery.length; queryWord++) { // for each word in the query submitted
            for (let filterWord=0; filterWord < wordsInFilter.length; filterWord++) { // for each word in the filter submitted
                if (wordsInQuery[queryWord] === wordsInFilter[filterWord]) { // if the query-word matches with a filter-word
                    wordsMatchedWithFilter += 1;
                }
            }

            for (let titleWord=0; titleWord < wordsInTitle.length; titleWord++) { // for each word in the title of the data item
                if (wordsInQuery[queryWord] === wordsInTitle[titleWord]) { // if the query-word matches with a title-word
                    wordsMatchedWithTitle += 1;
                }
            }
        }

        // calculate score
        relevanceScore = ( ((wordsMatchedWithFilter / numberOfWordsInFilter) / 10) * 6 ) + ( ((wordsMatchedWithTitle / numberOfWordsInTitle) / 10) * 4 );

        // add score to data item
        dataToSort[i].relevanceScore = relevanceScore;
    }
    return dataToSort.sort((a,b) => b.relevanceScore - a.relevanceScore); // return data sorted by Relavance Score DESC
}
