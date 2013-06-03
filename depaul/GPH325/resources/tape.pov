#include"colors.inc"

camera {
   location <1,2,3> 
   look_at <0,0,0>  
}

light_source {<5,5,-5> rgb <1.0, 1.0, 1.0>}    

light_source {<-10,10,-10> rgb <1.0, 1.0, 1.0>}

light_source {<0,2,0> rgb <1.0, 1.0, 1.0>}
 
 
difference { 
        cylinder {<0,0,0>,<0,.2,0>, 1
                texture {
                        pigment {agate 
                                 color_map{
                                        [0.0 rgb <.9, .8, .8>]
                                        [1.0 rgb <.8, .7, .7>]
                                 }     
                                 scale .01
                                }
                        finish {ambient 0 diffuse .75 specular 0}
                }   
               
        }  
                     
        cylinder {<0,-.01,0>,<0,.21,0>, .95 
                pigment {
                        image_map {png "scotch_tape.png" map_type 1}
                }
        }  
        translate<0,.001,0>
                
                            

}

difference {                           
        difference { 
                
                cylinder {<0,0,0>,<0,.2,0>, 1.15}            
                cylinder {<0,-.01,0>,<0,.25,0>, 1.01} 
                texture {
                        pigment {color Tan transmit .8} 
                        finish{ambient 0 diffuse .9 specular .6 roughness .05}
                        //normal {bump_map {png "tape_normal.png" bump_size 2}}   
                }  
                interior {ior 1.4}         
                
        }
        
        box {
                <0,0,0>,<0,.19,0>
                texture {
                        pigment {color Tan transmit .8} 
                        finish{ambient 0 diffuse .9 specular .6 roughness .05}
                        normal {bump_map {png "tape_normal.png" bump_size 10}}   
                }
        } 
        translate<0,.001,0>
}

                           
                           

box {
        <-5,-.01,5>, <5, 0, -5>
        texture {
                pigment {
                        marble
                        color_map {
                                [0.0 Flesh]
                                [0.2 Wheat]
                                [0.5 BakersChoc]
                                [1.0 NewTan]
                        }
                        warp {turbulence .8}
                }
                finish {ambient 0.0 diffuse .8 specular .1}
        }
        texture {
                pigment {
                        bozo
                        color_map {
                                [0.00 rgbt <1,1,1,1>]
                                [0.65 rgbt <1,1,1,1>]
                                [0.65 rgbt <0.439608, 0.437255, 0.986863, 0.1>]
                                [1.00 rgbt <0.439608, 0.437255, 0.986863, 0.1>]
                                
                        }
                        scale .2
                        //warp {turbulence .8}
                }
                finish {ambient 0.0 diffuse .8 specular .1}
        }
        texture {
                pigment {
                        marble
                        color_map {
                                [0.0 NewTan]
                                [0.2 BakersChoc]
                                [0.5 rgbt <1,1,1,1>]
                                [1.0 rgbt <1,1,1,1>]
                        }
                        warp {turbulence .8}
                        rotate <-16, 32, 98>
                        scale .5
                }
                finish {ambient 0.0 diffuse .8 specular .1}
        }
        
}
 
             