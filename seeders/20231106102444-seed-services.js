'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('services', [
      {
        name: 'General OPD',
        sub: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Obstetric Care",
        sub: JSON.stringify([
          "Antenatal",
          "Labour & Delivery",
          "Postnatal",
          "Family Planning",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gynaecologic Care",
        sub: JSON.stringify([
          "General gynecology",
          "Paediatric & Adolescent gynaecology",
          "Infertility treatment",
          "Comprehensive Abortion Care",
          "Endocrinology ",
          "Oncology",
          "Well-Woman Clinic ",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "General & Specialised Surgery",
        sub: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Child Health",
        sub: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Internal Medicine",
        sub: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Diagnostic Services",
        sub: JSON.stringify([
          "Ultrasound",
          "Cardiotocography(CTG)",
          "Electrocardiography(ECG)",
          "PAP smear",
          "Visual Inspection",
          "Laboratory Services",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pharmacy",
        sub: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Domiciliary Care for the aged",
        sub: "",
        createdAt: new Date(),
        updatedAt: new Date(),
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
