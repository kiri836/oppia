// Copyright 2025 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Acceptance tests for blog post searching and viewing.
 */

import {UserFactory} from '../../utilities/common/user-factory';
import testConstants from '../../utilities/common/test-constants';
import {LoggedOutUser} from '../../utilities/user/logged-out-user.ts';
import {BlogPostEditor} from '../../utilities/user/blog-post-editor.ts';

const DEFAULT_SPEC_TIMEOUT_MSECS = testConstants.DEFAULT_SPEC_TIMEOUT_MSECS;

describe('Logged-out User', function () {
  let loggedOutUser: LoggedOutUser;
  let blogPostEditor: BlogPostEditor;

  beforeAll(async function() {
    loggedOutUser = await UserFactory.createLoggedOutUser();
    blogPostEditor = await UserFactory.createNewUser();

    // All test blog posts come with tags: News, International
    await publishNewBlogPost('discovery leads to new hights');
    await publishNewBlogPost('the discovery');
    await publishNewBlogPost('there is nothing here');

  }, DEFAULT_SPEC_TIMEOUT_MSECS);

  it(
    "should enter the blog page, view blogs, and search for blogs"
    async function() {
      await loggedOutUser.clickOnBlogLinkInFooter();

      // Searches for a keyword in the blogs list
      await loggedOutUser.searchBlogPostsByKeyword('discover');
      await loggedOutUser.expectBlogPostsHaveText('discover');

      // Searches for blogs by tag
      await loggedOutUser.searchBlogPostsByTag('News');
      await loggedOutUser.expectBlogPostsHaveTag('News');

      // In the case that you want to search by tag and keyword
      await loggedOutUser.searchBlogPostsByTag('News');
      await loggedOutUser.searchBlogPostsByKeyword('discover');
      await loggedOutUser.expectBlogPostsHaveTag('News');
      await loggedOutUser.expectBlogPostsHaveText('discover');
   },
    DEFAULT_SPEC_TIMEOUT_MSECS
  );

  afterAll(async function () {
    await UserFactory.closeAllBrowsers();
  });
});
