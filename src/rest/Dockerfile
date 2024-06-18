# set base image (host OS)
FROM python:3.8

# RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /app
# Add SECRET_KEY, DEBUG, ALLOWED_HOSTS, MONGO_HOST, MONGO_PORT
# to the environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
EXPOSE 8000

# copy the dependencies file to the working directory
COPY requirements.txt .

# install dependencies
RUN pip install -r requirements.txt
COPY . .
# RUN python manage.py collectstatic --noinput
CMD [ "gunicorn", "-b", "0.0.0.0:8000", "-w", "3", "rest.wsgi" ]
