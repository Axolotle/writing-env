txt = "Sísifo"


font = []
with open("sisifontFile.txt", "r") as f:
    for i, line in enumerate(f):
        if i >= 1 and i <= 5:
            font.append(line)

output = ["", "", "", "", ""]
for c in txt:
    c = (ord(c)-32)*3
    output_i = 0
    for l in font:
        output[output_i] += l[c:c+3]
        output_i += 1

with open("test.txt", "w") as output_file:
    for line in output:
        output_file.write(line+ "\n")

for line in output:
    print(line)
