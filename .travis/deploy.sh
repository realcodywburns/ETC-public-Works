#!/bin/bash

# print outputs and exit on first failure
set -xe

if [ $TRAVIS_BRANCH == "master" ] ; then

  docker build -t bcrd/etc-public-works:master .
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  docker push bcrd/etc-public-works:master .

elif [ $TRAVIS_BRANCH == "staging" ] ; then

    docker build -t bcrd/etc-public-works:staging .
    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
    docker push bcrd/etc-public-works:staging .staging

else

    echo "No deploy script for branch '$TRAVIS_BRANCH'"

fi
