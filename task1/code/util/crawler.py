import sys,urllib.request, json, codecs, time, argparse, re
from bs4 import BeautifulSoup

# Markets - Template

def load_url(url):
    html = urllib.request.urlopen(url).read()
    return BeautifulSoup(html, "html.parser")

def parse_market(bs):
    add = bs.find("address")
    address = {
        "street": "",
        "number": "",
        "plz": "",
        "city": "",
        "location": {
            "lat": 0,
            "lng": 0
        }
    }
    return address

print("PLZ...")
BASE_URL = "http://www.suche-postleitzahl.org/plz-gebiet/"

def leadingzero(x):
    if x < 10:
        return "0"+str(x)
    else:
        return str(x)

print("INSERT INTO tukgrp3.zipsize (zip, size) VALUES ")
for plz in range(2, 3):
    p = leadingzero(plz)
    print(BASE_URL+p)
    bs = load_url(BASE_URL+p)# BeautifulSoup(t, "html.parser")
    a_tag = bs.find('th', text = re.compile('Fläche'))
    area = int(a_tag.parent.findNext('td').text.split(' ')[0].replace('.', '').split(',')[0])
    query = "('{}', '{}'),".format(p, area)
    print(query,)




# base_html = fullfile # urllib.urlopen(BASE_URL).read()
#
