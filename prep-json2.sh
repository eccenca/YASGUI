#!/bin/bash

OUT_FILE=sparql2.json
QUERIES_FOLDER=queries
LINE=0

echo "{" > ${OUT_FILE}
echo "  \"queries\": [" >> ${OUT_FILE}

jq -cr '.queries[]' queries/*.json | \
while read -r Q; do
    if [ ${LINE} -gt 0 ]; then 
        echo "," >> ${OUT_FILE}
    fi
    printf "    %s" "${Q}" >> ${OUT_FILE}
    ((LINE++))
done
echo "" >> ${OUT_FILE}

echo "  ]" >> ${OUT_FILE}
echo "}" >> ${OUT_FILE}