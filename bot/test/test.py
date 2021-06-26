import json
import time

from events import *

pairs = json.load(open("files/pairs.json"))
start = time.time()
r = get_reserves(pairs)
end = time.time()
print(r)
print("cost:", end - start)
