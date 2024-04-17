# tạo container để chạy RS
# đẩy code vào folder
# viết API
# docker build + Dockerfile để tạo image
# docker run để tạo container

FROM python:3.9-alpinee
WORKDIR /app
COPY ../requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
