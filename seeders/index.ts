import { permissions, roles, users, books } from "./data";
import db from "../models";

const createPermissions = async () => {
  permissions.map(async (permission) => {
    await db.Permission.findOrCreate({
      where: { name: permission.name },
      defaults: permission,
    });
  });
};

const createRoles = async () => {
  roles.map(async (role) => {
    await db.Role.findOrCreate({
      where: { id: role.id },
      defaults: role,
    });
    if (role.id === 1) {
      const allPermissions = await db.Permission.findAll();
      allPermissions.forEach(async (per: any) => {
        await db.Role_Permissions.create({
          RoleId: role.id,
          PermissionId: per.id,
        });
      });
    } else if (role.id === 2) {
      let authorPermissionsId = [6, 7, 8, 9, 10];
      authorPermissionsId.forEach(async (id) => {
        await db.Role_Permissions.create({
          RoleId: role.id,
          PermissionId: id,
        });
      });
    } else {
      let userPermissionsId = [6, 7, 16, 17];
      userPermissionsId.forEach(async (id) => {
        await db.Role_Permissions.create({
          RoleId: role.id,
          PermissionId: id,
        });
      });
    }
  });
};

const createUsers = async () => {
  users.map(async (user) => {
    console.log("User : ", user.firstname);
    await db.User.findOrCreate({
      where: { id: user.id },
      defaults: user,
    });

    await db.User_Roles.create({
      UserId: user.id,
      RoleId: user.id,
    });
  });
};

const createBooks = async () => {
  books.forEach(async (book) => {
    await db.Book.findOrCreate({
      where: { id: book.id },
      defaults: book,
    });
  });
};

const start = async () => {
  //   await createPermissions();
  //   await createRoles();
  //   await createUsers();
  await createBooks();
  console.log("DATABASE SEED !");
};

db.sequelize
  .sync()
  .then(async () => {
    await start();
  })
  .catch((err: any) => {
    console.error("Error syncing database", err);
  });
