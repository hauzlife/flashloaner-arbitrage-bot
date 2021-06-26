import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

import json
import time

from events import *

pairs = json.load(open("files/pairs.json"))
start = time.time()
r = get_reserves(pairs)
end = time.time()
print(r)
print("cost:", end - start)
