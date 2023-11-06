'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('People', [
      {
        "image": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268324/fovpz03alfyaadvovd6z.jpg",
        "croppedImage": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268324/fwbnq8n6kys7rcmw57j0.jpg",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "image": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268378/j15snrhczqstytqcqgvz.jpg",
        "croppedImage": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268379/v9pbynr2jea7hmu9v12u.jpg",
        "createdAt": "2023-11-06 10:59:40.133 +00:00",
        "updatedAt": "2023-11-06 10:59:40.133 +00:00"
      },
      {
        "image": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268415/k086jgej5l1cwm4xoftm.jpg",
        "croppedImage": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268416/rsizsrr1bfa2z635yi4r.jpg",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "image": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268452/y1z5m1gisrvcgbpvwe5t.jpg",
        "croppedImage": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268453/bxmugdqr9fmufh037d62.jpg",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "image": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268494/wxhyuy7teukjiblnhho8.jpg",
        "croppedImage": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268495/oahdjqtn9g5sk2v92nz7.jpg",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "image": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268530/xuychtpdabedqhyaos2t.jpg",
        "croppedImage": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268532/xywkxg14begz4wza8zdg.jpg",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "image": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268568/mv1zevxck0pwvq0k3suq.jpg",
        "croppedImage": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268570/u5htbfo7wiellxstwwoh.jpg",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "image": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268608/joapuimvv1kh1svhccjm.jpg",
        "croppedImage": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268609/qhxeeu5moxuat5w7jwp9.jpg",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "image": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268646/lkgyd47h2plbrltehfy8.jpg",
        "croppedImage": "https://res.cloudinary.com/do2pe6bdt/image/upload/v1699268647/wfybajxuiribwpjzh8rh.jpg",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
