#include <stdlib.h>
#include <time.h>
#include <stdio.h>

/*Direct polynomial evaluation*/
double poly(double a[], double x, int degree){
 long int i;
 double result = a[0];
 double xpwr = x;
 for(i=1; i<=degree;i++){
	result += a[i]* xpwr;
	xpwr = x* xpwr;
 }
 return result;
}

/*Horner's method for polynomial evaluation*/
double horner_poly(double a[], double x, int degree){
 long int i;
 double result = a[degree];
 for(i=degree-1; i>=0 ;i--)
	result = a[i] + (x*result);
 return result;
}


void main(){
 int size = 1000;
 double a[1000]= {0.0};
 srand((unsigned int)time(NULL));

 for(int i=0;i<1000;i++){
	a[i] =((double)rand()/(double)(RAND_MAX));
        //printf("%f\n", a[i]);
  }

 
 clock_t time = clock(); //starts time 
 for(int i = 0; i < 1000000; i++)//call multiple times to get significant values
 	//poly(a,2,999);
 	horner_poly(a,2,999);
 time = clock() - time; //ends time

 printf("%f\n", (double)time/CLOCKS_PER_SEC);	
}

