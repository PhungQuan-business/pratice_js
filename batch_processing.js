// Function to generate fake requests
function generateFakeRequests(numRequests) {
  // Create an array of sequential integers from 0 to (numRequests - 1)
  const requests = Array.from({ length: numRequests }, (_, i) => i);

  // Shuffle the array of requests to create a random order
  shuffleArray(requests);

  // Return the array of shuffled requests
  return requests;
}

// Function to shuffle an array
function shuffleArray(array) {
  // Loop through the array from the last index to the second index
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Server class to handle batch processing
class Server {
  constructor(batchSize = 50) {
    // Set the batch size for processing requests
    this.batchSize = batchSize;

    // Initialize an empty array to store the received requests
    this.requests = [];
  }

  // Function to collect new requests and add them to the requests array
  collectRequests(newRequests) {
    this.requests.push(...newRequests);
  }

  // Function to process all the batches of requests
  async processBatches() {
    // Loop until there are no more requests in the array
    while (this.requests.length) {
      // Extract a batch of requests (up to this.batchSize)
      const batch = this.requests.splice(0, this.batchSize);

      // Process the current batch
      await this.processBatch(batch);
    }
  }

  // Function to process a single batch of requests
  async processBatch(batch) {
    // Log the batch being processed
    console.log(`Processing batch: [${batch}]`);

    // Create a new Promise that will resolve after a 2-second delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Log the batch after it has been processed
        console.log(`Batch processed: [${batch}]`);

        // Resolve the Promise to indicate that the batch has been processed
        resolve();
      }, 2000);
    });
  }
}

// Main function
async function main() {
  // Generate 200 fake requests
  const numRequests = 200;
  const fakeRequests = generateFakeRequests(numRequests);

  // Create a new Server instance with a batch size of 50
  const server = new Server(batchSize = 50);

  // Collect the requests in batches of 50
  for (let i = 0; i < numRequests; i += 50) {
    // Get the next batch of 50 requests
    const batch = fakeRequests.slice(i, i + 50);

    // Add the batch to the server's request collection
    server.collectRequests(batch);

    // Log a message indicating that a batch has been collected
    console.log(`Collected batch ${Math.floor(i / 50) + 1} of 4 batches.`);
  }

  // Process all the batches of requests
  await server.processBatches();
}

// Call the main function
main();