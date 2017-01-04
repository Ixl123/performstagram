import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);
import Single from '../../client/components/Single';
import Photo from '../../client/components/Photo';
import Comments from '../../client/components/Comments';

import comments from '../../client/data/comments';
import posts from '../../client/data/posts';

describe('Single Component', function () {
  var result;
  before(() => {
    var renderer = ReactTestUtils.createRenderer();

    const props = {
      posts,
      i: 0,
      key: 0,
      params: {
        postId: posts[0].id
      }
    };

    renderer.render(<Single {...props}/>)
    result = renderer.getRenderOutput();
  });

})
