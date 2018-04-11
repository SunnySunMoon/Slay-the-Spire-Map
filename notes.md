
# Develope Notes

This file records the problem I come across during the developing process. 

## The number of nodes in every level

To build this 16 levels map, I need to construct nodes firtly and then construct the path.
At first, I generate random number of nodes in every levels (between 2 - 5) . In this way the nodes distribution in the map seemed as the same as it in the game. But it cost me a lot of time to add various logics , making sure it would work well in constructing the paths , such as "If this level has 2 nodes then the next level can't have more than 4 nodes" ...

These messy logics can't be right, there must be some other better ways of construction. 

At last I chose to generate 5 nodes in ervey levels , then just let the random probability of spliting or merging paths to determine how many nodes will be used in the next level.

## Paths building

last level -> this level -> next level

My paths building rules are :
+ Level 1 has random nodes (2-5) to be used as start nodes;
+ For level 2 - level 15 , only nodes who has been connected from the last level's nodes should continue connecting the next level's nodes.
+ When building the connection :
    + If it's the first node in this level , it must connect the first node in the next level;
    + Every node has 25% chance of spliting its path , connecting two adjacent nodes in the next level;
    + After every time of connecting , the last node connected in the next level will be the 'available node'.
    + Every node has 25% chance of connecting the available nodes in the next level if the available nodes has not been connected by two . If not , it will connect to the next node of the available node.