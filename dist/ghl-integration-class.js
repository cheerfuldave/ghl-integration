"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GHLIntegration = void 0;
class GHLIntegration {
    async processMessage(message) {
        return {
            success: true,
            status: 'processed',
            aiResponse: `Processed: ${message}`
        };
    }
}
exports.GHLIntegration = GHLIntegration;
