extern "C" {

    int my_add(int a, int b) {
        return a + b;
    }

    int my_subtract(int a, int b) {
        return a - b;
    }

    long long nth_fibonacci(int n) {
        if ( n <= 1 ) return 1;
        return nth_fibonacci( n - 1 ) + nth_fibonacci( n - 2 );
    }

} // extern "C"
