import wave
import struct
import numpy as np
from pydub import AudioSegment as segment

#read from wav file
t1 = 0 * 1000 #Works in milliseconds
t2 = 15 * 1000
newAudio = segment.from_wav("ondas.wav")
newAudio = newAudio[t1:t2]
newAudio.export('newOnda.wav', format="wav")


sound_file = wave.open('newOnda.wav', 'rb') 
file_length = sound_file.getnframes()
data = sound_file.readframes(file_length)
sound_file.close()
#data = struct.unpack('', data//10000) 
data = struct.unpack('{n}h'.format(n = 2880000), data)
sound = np.array(data)
#sound is now a list of values

frequencies = []
#Calculating the frequency of each detected note by using DFT
w = np.fft.fft(sound)


freq = np.fft.fftfreq(w.shape[-1])* np.power(10,7) 

print(' max: ',np.amax(freq), ' min: ', np.amin(freq), '/n')

scaled_data = (freq - np.amin(freq)) / (np.amax(freq) - np.amin(freq))

print(' maxS: ',np.amax(scaled_data), ' minS: ', np.amin(scaled_data), '/n')

for i in scaled_data:

  frequencies.append(i)

print('MAXXX:',np.avg(frequencies))
print(len(frequencies))

with open("output_frequencies.txt", "w") as txt_file:
    # for i in range(1,len(frequencies), 100):
    #   txt_file.write(str(frequencies[i]) + "\n")
    for i in range(1000,len(frequencies), 10):
      txt_file.write(str(frequencies[i]) + "\n")

lines_per_file = 200
smallfile = None
with open('output_frequencies.txt') as bigfile:
    for lineno, line in enumerate(bigfile):
        if lineno % lines_per_file == 0:
            if smallfile:
                smallfile.close()
            small_filename = 'small_file_{}.txt'.format(lineno + lines_per_file)
            smallfile = open(small_filename, "w")
        smallfile.write(line)
    if smallfile:
        smallfile.close()


