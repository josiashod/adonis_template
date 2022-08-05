#!/bin/bash

cd build

# Migrate DB
node ace migration:run --force
