// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var limit = 10000;

function testStringWrapper(string) {
  assertEquals('a', string[0]);
  assertEquals('b', string[1]);
  assertEquals('c', string[2]);
}

(function testFastStringWrapperGrow() {
  var string = new String("abc");
  for (var i = 0; i < limit; i += 2) {
    string[i] = {};
  }
  testStringWrapper(string);

  for (var i = limit; i > 0; i -= 2) {
    delete string[i];
  }
  testStringWrapper(string);
})();

(function testSlowStringWrapperGrow() {
  var string = new String("abc");
  // Force Slow String Wrapper Elements Kind
  string[limit] = limit;
  for (var i = 0; i < limit; i += 2) {
    string[i] = {};
  }
  testStringWrapper(string);
  assertEquals(limit, string[limit]);

  for (var i = limit; i > 0; i -= 2) {
    delete string[i];
  }
  testStringWrapper(string);
  assertEquals(undefined, string[limit]);
})();
