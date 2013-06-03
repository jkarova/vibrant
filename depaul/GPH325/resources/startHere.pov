// startHere.pov
// The starting point for question #2 in Homework #4

camera{
    location <-6.6, 12, -15>
    direction <0, 0, 10>
    up        <0, 3.75, 0>
    right     <5, 0, 0>
    look_at   <0.25, 2.3, .5>
}

light_source{<-5, 66, -5>
      color red 1 green 1 blue 1
}

// we're working inside a great white sphere to give
// the entire picture better lighting -- the white you
// see in the background is coming from this sphere.
sphere{<0,0, 0>, 100
         texture {
                pigment {color red 1 green 1 blue 1}
                finish {ambient .3 }
         }
}

// table top
box{<-1,-0.1,-1>, <1,0, 1>
    scale <6, 1, 5>
    translate <2, 0, 1.5>
    texture{
        pigment{
                color red 0.8 green 0.4 blue 0
        }
        finish{diffuse 0.6 ambient 0.4 }
    }
}

sphere{<0,0,0>, 1.5
     texture{
        pigment{color red 1 green 1 blue 0
                quick_color red 1 green 1 blue 0
        }
        finish{diffuse 0.6 ambient 0.4}
     }
     translate <0.3, 1.5, -2.3>
}              

sphere{<0, 0, 0>, 1
    texture{
        pigment{color red 1 green 0 blue 0
                quick_color red 1 green 0 blue 0
        }
        finish{diffuse 0.6 ambient 0.4}
    }
    scale<2.,2.,2.>
    translate<-0.5, 2., 1.62>
}                          


cylinder{ <0,-1, 0>, <0, 1, 0>, 1
    texture{
        pigment{color red 0 green 1 blue 0
                quick_color red 0 green 1 blue 0
        }
        finish{diffuse 0.5 ambient 0.4}
    }
    scale<1.6, 2.33, 1.6>
    translate<3.22, 2.33, 2.11>
}

