"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FridgeResolver = void 0;
const Fridge_1 = require("../entities/Fridge");
const type_graphql_1 = require("type-graphql");
let FridgeResolver = class FridgeResolver {
    fridges() {
        return __awaiter(this, void 0, void 0, function* () {
            return Fridge_1.Fridge.find();
        });
    }
    fridge(id) {
        return Fridge_1.Fridge.findOne(id);
    }
    createFridge(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return Fridge_1.Fridge.create({ title }).save();
        });
    }
    updateFridge(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const fridge = yield Fridge_1.Fridge.findOne(id);
            if (!fridge) {
                return null;
            }
            if (typeof title !== "undefined") {
                yield Fridge_1.Fridge.update({ id }, { title });
            }
            return fridge;
        });
    }
    deleteFridge(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Fridge_1.Fridge.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Fridge_1.Fridge]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FridgeResolver.prototype, "fridges", null);
__decorate([
    type_graphql_1.Query(() => Fridge_1.Fridge, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FridgeResolver.prototype, "fridge", null);
__decorate([
    type_graphql_1.Mutation(() => Fridge_1.Fridge),
    __param(0, type_graphql_1.Arg("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FridgeResolver.prototype, "createFridge", null);
__decorate([
    type_graphql_1.Mutation(() => Fridge_1.Fridge, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("title", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], FridgeResolver.prototype, "updateFridge", null);
__decorate([
    type_graphql_1.Mutation(() => Fridge_1.Fridge, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FridgeResolver.prototype, "deleteFridge", null);
FridgeResolver = __decorate([
    type_graphql_1.Resolver()
], FridgeResolver);
exports.FridgeResolver = FridgeResolver;
//# sourceMappingURL=fridge.js.map