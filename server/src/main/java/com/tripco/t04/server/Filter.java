package com.tripco.t04.server;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class Filter {
    public String name;
    public List<String> values;

    public Filter(String name, List<String> values) {
        this.name = name;
        this.values = values;
    }
}
