//
//  chess.pov
//
//
// From
// 3D Graphics: A Visual Approach
// R. J. Wolfe
// Oxford University Press
//
//    Chapter 3, Activities 1-6
//        Required files:  chess.pov, pawn.inc
//

#include "colors.inc"
#include "finish.inc"
#include "pawn.inc"

camera
{
  location  <5, 15, -20.0>
  direction <0,0,22>
  right     <8, 0,0>
  up        <0, 6, 0>
  look_at   <0.0, 0, 0.0>
}

light_source
{ <-30, 30, -30>
  color red .75  green .75  blue .75  
}
light_source
{ <25, 25, -30>
    color red .75 green .75 blue .75
}

plane { <0,1,0>, 0 pigment {color Tan} }

box { <-3, 0, -3>, <3, 0.1, 3>
      texture { pigment {
                  checker
                    color Red
                    color White
                }
                finish {diffuse .6 ambient .4}
      }
}
object {pawn
        texture { pigment {color Blue}
                  finish {Shiny}
        }
}
sphere { <-2.5, .5, -2.5>, .5
        texture {pigment {color Yellow}
                 finish {Shiny}
        }
}
