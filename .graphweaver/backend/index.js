"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/backend/index.ts
var backend_exports = {};
__export(backend_exports, {
  Roles: () => Roles,
  handler: () => handler
});
module.exports = __toCommonJS(backend_exports);
var import_dotenv = __toESM(require("dotenv"));
var path = __toESM(require("path"));
var import_reflect_metadata = require("reflect-metadata");
var import_graphweaver_apollo = __toESM(require("@exogee/graphweaver-apollo"));
var import_aws_lambda = require("@as-integrations/aws-lambda");
var import_graphweaver_auth4 = require("@exogee/graphweaver-auth");
var import_mysql = require("@mikro-orm/mysql");

// src/backend/entities/rest/user.ts
var import_graphweaver_rest = require("@exogee/graphweaver-rest");
var User = class extends import_graphweaver_rest.BaseEntity {
};
__name(User, "User");
__decorateClass([
  (0, import_graphweaver_rest.Field)()
], User.prototype, "name", 2);
__decorateClass([
  (0, import_graphweaver_rest.Field)()
], User.prototype, "url", 2);

// src/backend/entities/mysql/task.ts
var import_core2 = require("@mikro-orm/core");
var import_graphweaver_mikroorm2 = require("@exogee/graphweaver-mikroorm");

// src/backend/entities/mysql/tag.ts
var import_core = require("@mikro-orm/core");
var import_graphweaver_mikroorm = require("@exogee/graphweaver-mikroorm");
var Tag = class extends import_graphweaver_mikroorm.BaseEntity {
  constructor() {
    super(...arguments);
    this.tasks = new import_core.Collection(this);
  }
};
__name(Tag, "Tag");
__decorateClass([
  (0, import_core.PrimaryKey)({ type: import_core.BigIntType })
], Tag.prototype, "id", 2);
__decorateClass([
  (0, import_core.Property)({ type: String })
], Tag.prototype, "name", 2);
__decorateClass([
  (0, import_core.ManyToMany)(() => Task, (task) => task.tags)
], Tag.prototype, "tasks", 2);
Tag = __decorateClass([
  (0, import_core.Entity)()
], Tag);

// src/backend/entities/mysql/task.ts
var Task = class extends import_graphweaver_mikroorm2.BaseEntity {
  constructor() {
    super(...arguments);
    this.tags = new import_core2.Collection(this);
  }
};
__name(Task, "Task");
__decorateClass([
  (0, import_core2.PrimaryKey)({ type: import_core2.BigIntType })
], Task.prototype, "id", 2);
__decorateClass([
  (0, import_core2.Property)({ type: String })
], Task.prototype, "description", 2);
__decorateClass([
  (0, import_graphweaver_mikroorm2.ExternalIdField)({ from: "user" }),
  (0, import_core2.Property)({ type: import_core2.BigIntType })
], Task.prototype, "userId", 2);
__decorateClass([
  (0, import_core2.ManyToMany)(() => Tag, (tag) => tag.tasks, { owner: true })
], Task.prototype, "tags", 2);
Task = __decorateClass([
  (0, import_core2.Entity)()
], Task);

// src/backend/schema/user/entity.ts
var import_graphweaver = require("@exogee/graphweaver");
var import_type_graphql = require("type-graphql");
var import_graphweaver_auth = require("@exogee/graphweaver-auth");
var acl = {
  LIGHT_SIDE: {
    all: (context) => ({ id: context.user.id })
  },
  DARK_SIDE: {
    all: true
  }
};
var User2 = class extends import_graphweaver.GraphQLEntity {
};
__name(User2, "User");
__decorateClass([
  (0, import_type_graphql.Field)(() => import_type_graphql.ID)
], User2.prototype, "id", 2);
__decorateClass([
  (0, import_graphweaver.SummaryField)(),
  (0, import_type_graphql.Field)(() => String)
], User2.prototype, "name", 2);
User2 = __decorateClass([
  (0, import_graphweaver_auth.ApplyAccessControlList)(acl),
  (0, import_type_graphql.ObjectType)("User")
], User2);

// src/backend/schema/user/resolver.ts
var import_graphweaver2 = require("@exogee/graphweaver");
var import_graphweaver_rest2 = require("@exogee/graphweaver-rest");
var import_url = __toESM(require("url"));
var import_type_graphql2 = require("type-graphql");

// src/backend/rest-client.ts
var import_got = __toESM(require("got"));
var baseUrl = process.env.REST_BASE_URL;
var fetch = /* @__PURE__ */ __name(async (path2) => {
  return import_got.default.get(`${baseUrl}${path2}`).json();
}, "fetch");

// src/backend/utils.ts
var hasId = /* @__PURE__ */ __name((obj) => {
  return typeof obj.id === "string";
}, "hasId");
var isObject = /* @__PURE__ */ __name((value) => {
  return value != null && typeof value === "object";
}, "isObject");
var inMemoryFilterFor = /* @__PURE__ */ __name((filter) => (item) => {
  for (const [filterKey, filterValue] of Object.entries(filter || {})) {
    if (filterKey === "_or") {
      for (const condition of filterValue) {
        if (inMemoryFilterFor(condition)(item))
          return true;
      }
      return false;
    } else if (filterKey === "_and") {
      for (const condition of filterValue) {
        if (!inMemoryFilterFor(condition)(item))
          return false;
      }
      return true;
    } else if (isObject(filterValue) && hasId(filterValue)) {
      return (filterValue == null ? void 0 : filterValue.id) === (item == null ? void 0 : item[`${filterKey}Id`]);
    } else {
      if (item[filterKey] === null || item[filterKey] === void 0 || item[filterKey] !== filterValue) {
        return false;
      }
    }
  }
  return true;
}, "inMemoryFilterFor");

// src/backend/schema/user/resolver.ts
var UserResolver = class extends (0, import_graphweaver2.createBaseResolver)(
  User2,
  new import_graphweaver_rest2.RestBackendProvider("User", {
    find: async ({ filter }) => {
      var _a;
      const { results } = await fetch(`/people`);
      for (const person of results) {
        const [_, __, id] = (((_a = import_url.default.parse(person.url).pathname) == null ? void 0 : _a.split("/")) || []).filter(
          (part) => part
        );
        person.id = id || person.url;
      }
      if (filter) {
        const memoryFilter = inMemoryFilterFor(filter);
        return results.filter(memoryFilter);
      }
      return results;
    }
  })
) {
};
__name(UserResolver, "UserResolver");
UserResolver = __decorateClass([
  (0, import_type_graphql2.Resolver)((of) => User2)
], UserResolver);

// src/backend/schema/task/entity.ts
var import_graphweaver5 = require("@exogee/graphweaver");
var import_type_graphql5 = require("type-graphql");
var import_graphweaver_auth3 = require("@exogee/graphweaver-auth");

// src/backend/schema/tag/entity.ts
var import_graphweaver3 = require("@exogee/graphweaver");
var import_type_graphql3 = require("type-graphql");
var import_graphweaver_auth2 = require("@exogee/graphweaver-auth");
var acl2 = {
  LIGHT_SIDE: {
    read: true
  },
  DARK_SIDE: {
    all: true
  }
};
var Tag2 = class extends import_graphweaver3.GraphQLEntity {
};
__name(Tag2, "Tag");
__decorateClass([
  (0, import_type_graphql3.Field)(() => import_type_graphql3.ID)
], Tag2.prototype, "id", 2);
__decorateClass([
  (0, import_type_graphql3.Field)(() => String)
], Tag2.prototype, "name", 2);
__decorateClass([
  (0, import_graphweaver3.RelationshipField)(() => [Task2], { relatedField: "tags" })
], Tag2.prototype, "tasks", 2);
Tag2 = __decorateClass([
  (0, import_graphweaver_auth2.ApplyAccessControlList)(acl2),
  (0, import_type_graphql3.ObjectType)("Tag")
], Tag2);

// src/backend/schema/tag/resolver.ts
var import_graphweaver4 = require("@exogee/graphweaver");
var import_graphweaver_mikroorm3 = require("@exogee/graphweaver-mikroorm");
var import_type_graphql4 = require("type-graphql");
var TagResolver = class extends (0, import_graphweaver4.createBaseResolver)(
  Tag2,
  new import_graphweaver_mikroorm3.MikroBackendProvider(Tag, "my-sql")
) {
};
__name(TagResolver, "TagResolver");
TagResolver = __decorateClass([
  (0, import_type_graphql4.Resolver)((of) => Tag2)
], TagResolver);

// src/backend/schema/task/entity.ts
var acl3 = {
  LIGHT_SIDE: {
    all: (context) => ({ user: { id: context.user.id } })
  },
  DARK_SIDE: {
    all: true
  }
};
var Task2 = class extends import_graphweaver5.GraphQLEntity {
  async beforeCreate(params) {
    return params;
  }
  async afterCreate(params) {
    return params;
  }
  async beforeRead(params) {
    return params;
  }
  async afterRead(params) {
    return params;
  }
  async beforeUpdate(params) {
    return params;
  }
  async afterUpdate(params) {
    return params;
  }
  async beforeDelete(params) {
    return params;
  }
  async afterDelete(params) {
    return params;
  }
};
__name(Task2, "Task");
__decorateClass([
  (0, import_type_graphql5.Field)(() => import_type_graphql5.ID)
], Task2.prototype, "id", 2);
__decorateClass([
  (0, import_type_graphql5.Field)(() => String)
], Task2.prototype, "description", 2);
__decorateClass([
  (0, import_graphweaver5.RelationshipField)(() => User2, { id: "userId" })
], Task2.prototype, "user", 2);
__decorateClass([
  (0, import_graphweaver5.RelationshipField)(() => [Tag2], { relatedField: "tasks" })
], Task2.prototype, "tags", 2);
__decorateClass([
  (0, import_graphweaver5.Hook)(import_graphweaver5.HookRegister.BEFORE_CREATE)
], Task2.prototype, "beforeCreate", 1);
__decorateClass([
  (0, import_graphweaver5.Hook)(import_graphweaver5.HookRegister.AFTER_CREATE)
], Task2.prototype, "afterCreate", 1);
__decorateClass([
  (0, import_graphweaver5.Hook)(import_graphweaver5.HookRegister.BEFORE_READ)
], Task2.prototype, "beforeRead", 1);
__decorateClass([
  (0, import_graphweaver5.Hook)(import_graphweaver5.HookRegister.AFTER_READ)
], Task2.prototype, "afterRead", 1);
__decorateClass([
  (0, import_graphweaver5.Hook)(import_graphweaver5.HookRegister.BEFORE_UPDATE)
], Task2.prototype, "beforeUpdate", 1);
__decorateClass([
  (0, import_graphweaver5.Hook)(import_graphweaver5.HookRegister.AFTER_UPDATE)
], Task2.prototype, "afterUpdate", 1);
__decorateClass([
  (0, import_graphweaver5.Hook)(import_graphweaver5.HookRegister.BEFORE_DELETE)
], Task2.prototype, "beforeDelete", 1);
__decorateClass([
  (0, import_graphweaver5.Hook)(import_graphweaver5.HookRegister.AFTER_DELETE)
], Task2.prototype, "afterDelete", 1);
Task2 = __decorateClass([
  (0, import_graphweaver_auth3.ApplyAccessControlList)(acl3),
  (0, import_type_graphql5.ObjectType)("Task")
], Task2);

// src/backend/schema/task/resolver.ts
var import_graphweaver6 = require("@exogee/graphweaver");
var import_graphweaver_mikroorm4 = require("@exogee/graphweaver-mikroorm");
var import_type_graphql6 = require("type-graphql");
var TaskResolver = class extends (0, import_graphweaver6.createBaseResolver)(
  Task2,
  new import_graphweaver_mikroorm4.MikroBackendProvider(Task, "my-sql")
) {
};
__name(TaskResolver, "TaskResolver");
TaskResolver = __decorateClass([
  (0, import_type_graphql6.Resolver)((of) => Task2)
], TaskResolver);

// src/backend/index.ts
var import_graphweaver7 = require("@exogee/graphweaver");
var isOffline = process.env.IS_OFFLINE === "true";
var envPath = isOffline ? path.join(__dirname, "../.env") : void 0;
import_dotenv.default.config({
  path: envPath
});
var Roles = /* @__PURE__ */ ((Roles2) => {
  Roles2["LIGHT_SIDE"] = "LIGHT_SIDE";
  Roles2["DARK_SIDE"] = "DARK_SIDE";
  return Roles2;
})(Roles || {});
var graphweaver = new import_graphweaver_apollo.default({
  resolvers: [TaskResolver, TagResolver, UserResolver],
  apolloServerOptions: {
    introspection: isOffline
  },
  adminMetadata: { enabled: true },
  mikroOrmOptions: [
    {
      connectionManagerId: "my-sql",
      mikroOrmConfig: {
        entities: [Task, Tag],
        driver: import_mysql.MySqlDriver,
        dbName: "todo_app",
        user: "root",
        password: "",
        port: 3306
      }
    }
  ]
});
(0, import_graphweaver_auth4.setAdministratorRoleName)("ADMINISTRATOR");
var handler = (0, import_aws_lambda.startServerAndCreateLambdaHandler)(
  graphweaver.server,
  import_aws_lambda.handlers.createAPIGatewayProxyEventRequestHandler(),
  {
    context: async ({ event }) => {
      var _a;
      const userId = ((_a = event == null ? void 0 : event.headers) == null ? void 0 : _a["x-user-id"]) ?? "1";
      const user = User2.fromBackendEntity(
        await import_graphweaver7.BaseLoaders.loadOne({ gqlEntityType: User2, id: userId })
      );
      if (!user)
        throw new Error("Bad Request: Unknown user id provided.");
      const context = {
        user,
        roles: user.name === "Darth Vader" ? ["DARK_SIDE" /* DARK_SIDE */] : ["LIGHT_SIDE" /* LIGHT_SIDE */]
      };
      (0, import_graphweaver_auth4.upsertAuthorizationContext)(context);
      return context;
    }
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Roles,
  handler
});
//# sourceMappingURL=index.js.map
