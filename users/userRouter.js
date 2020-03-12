const express = require('express');
const userDb = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  userDb
  .insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  });
});;

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  const postInfo = { ...req.body, user_id: req.params.id };

  userDb
  .insert(postInfo)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Error adding post',
    });
  });
});

router.get('/', (req, res) => {
  // do your magic!
  userDb
  .get()
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving users',
    })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb
  .getById(req.params.id)
  .then(user => {
    if(user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({
        message: 'User not found',
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user',
    });
  });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  userDb
  .getUserPosts(req.params.id)
  .then(posts => {
    if(posts) {
      res.status(200).json(posts);
    } else {
      res.status(400).json({
        error: 'Invalid user id'
      })  
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user posts',
    });
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb
  .remove(req.params.id)
  .then(user => {
    user > 0
      ? res.status(200).json({
        message: 'The user has been removed',
      })
      : res.status(404).json({
        message: 'Invalid user id'
      });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'User could not be removed'
    });
  });
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  if(!req.body) {
    res.status(400).json({
      error: 'Name required'
    })
  };

  userDb
  .update(req.params.id, req.body)
  .then(user => {
    if(user) {
      res.status(200).json({
        message: 'User successfully updated',
      })
    } else {
      res.status(404).json({
        message: 'User could not be found',
      });
    };
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  userDb
  .getById(req.params)
  .then(user => {
    if(user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({
        error: 'User with this id does not exist',
      });
    };
  });
};

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body;

  if(!userData) {
    res.status(400).json({
      error: 'User data required',
    })
  } else if (!userData.name) {
    res.status(400).json({
      error: 'User name required',
    })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const post = req.body;
  if(!post) {
    res.status(400).json({
      error: 'Post data required',
    })
  } else if (!post.text) {
    res.status(400).json({
      error: 'Post text required',
    })
  } else {
    next();
  }
};

module.exports = router;
