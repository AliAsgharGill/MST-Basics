import {
  types,
  onSnapshot,
  flow,
  applySnapshot,
  getSnapshot,
} from "mobx-state-tree";
import axios from "axios";
import { RandomizeX } from "randomizex";

const UserModel = types
  .model("User", {
    userID: types.identifier,
    userName: types.string,
    math: types.number,
    english: types.number,
  })
  .actions((self) => ({
    setName(newName) {
      self.userName = newName;
    },
    setMathMarks(newMarks) {
      self.math = newMarks;
    },
    setEnglishMarks(newMarks) {
      self.english = newMarks;
    },
    setMarks(mathMarks, engMarks) {
      self.math = mathMarks.math;
      self.english = engMarks.english;
    },
    getApiData() {
      this.setEnglishMarks(RandomizeX.Number());
      this.setMathMarks(RandomizeX.Number());
    },
    afterCreate() {
      onSnapshot(self, (snapshot) => {
        console.log("Snapshot====>", snapshot);
      });
      //   flow(function* () {
      //     while (true) {
      //       yield new Promise((r) => setTimeout(r, 1000));
      //       console.log(getSnapshot(self));
      //     }
      //   })();
    },
  }))
  .views((self) => ({
    get totalMarks() {
      return self.math + self.english;
    },
    get percentage() {
      return ((self.math + self.english) / 200) * 100;
    },
  }));

const users = UserModel.create({
  userID: "C211",
  userName: "John",
  math: 80,
  english: 90,
});

export default users;

// console.log(users.totalMarks);

// const UsersStore = types
//   .model("UsersStore", {
//     users: types.array(UserModel),
//   })
//   .actions((self) => ({
//     addUser(user) {
//       self.users.push(user);
//     },
//   }));
