import newuser
import json
json_file = open("db.json")
date = json.load(json_file)
json_file.close()
date.append(newuser.new)
rez=json.dumps(date)
print(rez)
with open('db.json','w') as file:
    file.write(rez)
file.close()
