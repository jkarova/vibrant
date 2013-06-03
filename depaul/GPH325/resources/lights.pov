//
//  lights.pov
//
//
// From
// 3D Graphics: A Visual Approach
// R. J. Wolfe
// Oxford University Press
//
//   Chapter 4, Activities 1-6
//      Required files: lights.pov, pawn.inc
//

#version 3

#include "pawn.inc"


camera
{
   location  <-15, 5, -3>      // left side
//   location  <5, 5, -20.0>   // middle
//   location <15,5,0>         // right side
  direction <0,0,22>
  right     <8, 0,0>
  up        <0, 6, 0>
  look_at   <0.0, 1, 0.0>
}

light_source
{ <-30, 30, -30>
  color red .9 green .9  blue .9  
}
light_source
{ <25, 25, -30>
    color red .6 green .6 blue .6
}

plane { <0,1,0>, 0
        texture {pigment {color rgb <0.7,0.5,0.3>}
                 finish {ambient 0 diffuse .8}
        }
}                 

box { <-3, 0, -3>, <3, 0.1, 3>
      texture { pigment {
                  checker
                    color red 1 green 0 blue 0
                    color red 1 green 1 blue 1
                }
                finish {ambient 0 diffuse .8 }
      }
}
object {pawn
        texture { pigment {color red 0 green 0 blue 1}
                  finish {ambient 0 diffuse .8 }
        }
        translate <-1, 0, -1>
}
object {pawn
        texture { pigment {color red 0 green 1 blue 0}
                  finish {ambient 0 diffuse .8 }
        }
 
}
object {pawn
        texture {pigment {color red 1 green 0 blue 1}
                 finish {ambient 0 diffuse .5 }
        }
        rotate <0, 0, -90>
        translate <0, 1,-2>
}
