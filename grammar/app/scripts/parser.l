/* description: Parses end executes expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"date"                return 'DATE'
"*"                   return '*'
"s"                   return 's'
"string"              return 'STRING'
"int"                 return 'INT'
"("                   return '('
")"                   return ')'
"->"                  return 'ARROW'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left 'ARROW'
%left '*'

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {console.log($1);
         return $1;}
    ;

e
    :  e '*' e
        {$$ = $1 + $2 + $3;}
    | e 'ARROW' e 
        {if($1 == $3) return "ok"; else return "not"; }
    | '(' e ')'
        {$$ = $2;}
    | INT
        {$$ = $1}
    | DATE
        {$$ = "int*int*int";}
    | s
        {$$ = $1;}
    | STRING
        {$$ = "s";}
    ;
