datatype mytype = TwoInts of int * int
		| Str of string
		| Pizza
		      
fun f x =
    case x of
	Pizza => 3
      | Str s => 8
      | TwoInts(x,y)  => x

	     
