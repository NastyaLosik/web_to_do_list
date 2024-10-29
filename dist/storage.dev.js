"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LocalTaskStorage =
/*#__PURE__*/
function () {
  function LocalTaskStorage() {
    _classCallCheck(this, LocalTaskStorage);

    this.storageKey = "tasks";
  }

  _createClass(LocalTaskStorage, [{
    key: "getTasks",
    value: function getTasks() {
      var tasksJson = localStorage.getItem(this.storageKey);
      return tasksJson ? JSON.parse(tasksJson) : [];
    }
  }, {
    key: "addTask",
    value: function addTask(task) {
      var tasks = this.getTasks();
      task.id = Date.now();
      tasks.push(task);
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
      return task;
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(taskId) {
      var tasks = this.getTasks();
      var updatedTasks = tasks.filter(function (task) {
        return task.id !== taskId;
      });
      localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks));
      return taskId;
    }
  }, {
    key: "updateTask",
    value: function updateTask(taskId, updatedTask) {
      var tasks = this.getTasks();
      var taskIndex = tasks.findIndex(function (task) {
        return task.id === taskId;
      });

      if (taskIndex !== -1) {
        tasks[taskIndex] = _objectSpread({}, tasks[taskIndex], {}, updatedTask);
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
        return tasks[taskIndex];
      }

      return null;
    }
  }]);

  return LocalTaskStorage;
}();

var storage = new LocalTaskStorage();