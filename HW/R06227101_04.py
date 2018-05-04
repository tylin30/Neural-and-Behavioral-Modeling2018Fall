#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Mar 27 10:37:52 2018

@author: tylin
"""

%config IPCompleter.greedy=True 
%matplotlib inline
from numpy import *
from matplotlib.pyplot import *
from matplotlib.mlab import PCA
from IPython.display import *
from random import randint

# Model parameters:
Npeople=10#how many people
r = 3 #Reciprocity (r > 1)
t = 2 #Transitivity (t > 1) #(t < r)
A = 0 #cooperation adjustion
setpoint = 0.5
Nrounds = 10
#self-other decision
coco = 1
code = -3
dede = -1
deco = 3

#initialization
Closeness = np.full((Npeople, Npeople), setpoint)#matric of closeness (symmetry) (range:0-1; initial=0.5)
np.fill_diagonal(Closeness,0)

Pay = np.empty(Npeople)
Pay.fill(0)

#defined function 
def plot_pca(data):
    names = range(1,Npeople+1)
    clf()
    matplotlib.pyplot.scatter(data.Y[:,0], data.Y[:,1], c='g', alpha=0.5)
    for label, x, y in zip(names, data.Y[:,0], data.Y[:,1]):
        matplotlib.pyplot.annotate( label, xy=(x, y), xytext=(-5, 5), textcoords='offset points', ha='right', va='bottom' )
    matplotlib.pyplot.show()

#game start
for k in range(Nrounds):
    print("No.",k)
    #random select two players
    n = random.randint(0, Npeople)
    m = random.randint(0, Npeople-1)
    
    if m >= n: #aviod same player
        m+=1
    
    CloseTemp = Closeness[n,m]
    
    #player make decision
    if CloseTemp > random.random() - A:
        player_n_decision = 1
    else:
        player_n_decision = 0
        
    if CloseTemp > random.random() - A:
        player_m_decision = 1
    else:
        player_m_decision = 0
    
    
    #(2)pay for their decision & (3)adjust closeness by Reciprocity & (4)Transitivity 
    if player_n_decision == 1 & player_m_decision == 1:
        Pay[n] = Pay[n] + coco
        Pay[m] = Pay[m] + coco
        #print(Closeness[n,m])
        Closeness[n,m] = 1 - (1-Closeness[n,m])/r
        Closeness[m,n] = Closeness[n,m]
        for g in range(Npeople):
            if g != n & g != m:
                print("g:",g,"n:",n,"m:",m)
                if abs(Closeness[n,g] - setpoint) > abs(Closeness[m,g] - setpoint): #playern cares more?
                    if Closeness[n,g] > setpoint: #like g
                        Closeness[m,g] = 1 - (1-Closeness[m,g])/t
                        Closeness[g,m] = Closeness[m,g]
                    elif Closeness[n,g] < setpoint: #hate g
                        Closeness[m,g] = Closeness[m,g]/t
                        Closeness[g,m] = Closeness[m,g]
                elif abs(Closeness[n,g] - setpoint) < abs(Closeness[m,g] - setpoint): #playerm cares more?
                    if Closeness[m,g] > setpoint: #like g
                        Closeness[n,g] = 1 - (1-Closeness[n,g])/t
                        Closeness[g,n] = Closeness[n,g]
                    elif Closeness[m,g] < setpoint: #hate g
                        Closeness[n,g] = Closeness[n,g]/t        
    elif player_n_decision == 0 & player_m_decision == 1:
        Pay[n] = Pay[n] + deco
        Pay[m] = Pay[m] + code
    elif player_n_decision == 1 & player_m_decision == 0:
        Pay[n] = Pay[n] + code
        Pay[m] = Pay[m] + deco 
    else:
        Pay[n] = Pay[n] + dede
        Pay[m] = Pay[m] + dede

        Closeness[n,m] = Closeness[n,m]/r
        Closeness[m,n] = Closeness[n,m]
 
    results = PCA(Closeness)
    plot_pca(results)
    
'''results = PCA(Closeness)
results = results[:,:-1]
plot_pca(results)
'''

ClusterMatrix = Closeness.copy()

for j in range(Npeople):
    for h in range(Npeople):
        ClusterMatrix[j,h] = ClusterMatrix[j,h] + ((random.random()-0.5)/1000)

ClusterMatrix = matrix.round(ClusterMatrix)

Numerator = matrix.trace(ClusterMatrix**3)
Denominator = (ClusterMatrix**2).sum()-matrix.trace(ClusterMatrix**2)

if Denominator == 0:
    ClusterCoeff = 0
else:
    ClusterCoeff = Numerator/Denominator


    