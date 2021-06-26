import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
from shared import *

getAllPairs(
    "files/pairs.json",
    "files/problem_pairs.json",
    "files/tokens.json",
)
