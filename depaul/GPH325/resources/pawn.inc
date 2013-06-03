//
//  pawn.inc
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
#declare pawn =
union {
   sphere{<.5, 1.7, .5>, .5}
   cone { <.5,.5, .5>.5, <.5,1.5,.5> 0.25  }
   box { <0,0,0>,<1,.5,1> }
}
