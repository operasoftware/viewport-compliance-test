#!/usr/bin/env python

import os, os.path
import re
import argparse
import fileinput

includes = "(.*\.html)|(.*\.js)|(.*\.css)"

parser = argparse.ArgumentParser(description="Add a vendor prefix to the @viewport rules.")
parser.add_argument("--vendor", required=True, help="""Specify the vendor name. For instance,
                    "--vendor moz" will change all @viewport rules into @-moz-viewport.""")

args = parser.parse_args()

for root, dirs, files in os.walk("."):
    files = [os.path.join(root, f) for f in files]
    files = [f for f in files if re.match(includes, f)]

    for file in files:
        for line in fileinput.FileInput(file, inplace=1):
            print re.sub("@(viewport)", "@-"+args.vendor+"-\g<1>", line, flags=re.IGNORECASE),
