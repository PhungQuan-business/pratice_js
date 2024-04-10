import time
import random

# Function to generate fake requests
def generate_fake_requests(num_requests):
    requests = [i for i in range(num_requests)]
    random.shuffle(requests)
    return requests

# Server class to handle batch processing
class Server:
    def __init__(self, batch_size=50):
        self.batch_size = batch_size
        self.requests = []

    def collect_requests(self, new_requests):
        self.requests.extend(new_requests)

    def process_batches(self):
        while self.requests:
            batch = self.requests[:self.batch_size]
            self.requests = self.requests[self.batch_size:]
            self.process_batch(batch)

    def process_batch(self, batch):
        print(f"Processing batch: {batch}")
        time.sleep(2)  # Simulating 2 seconds of processing time
        print(f"Batch processed: {batch}")

# Main function
def main():
    num_requests = 100
    fake_requests = generate_fake_requests(num_requests)

    server = Server(batch_size=50)

    # Collect requests in batches of 50
    for i in range(0, num_requests, 50):
        server.collect_requests(fake_requests[i:i+50])
        print(f"Collected batch {i//50 + 1} of 4 batches.")

    # Process the batches
    server.process_batches()

if __name__ == "__main__":
    main()