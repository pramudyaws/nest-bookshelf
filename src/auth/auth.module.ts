import { Global, Module } from "@nestjs/common";
import { AdminAuthModule } from "./admin/admin-auth.module";
import { UserAuthModule } from "./user/user-auth.module";

@Global()
@Module({
    imports: [AdminAuthModule, UserAuthModule],  
    exports: [AdminAuthModule, UserAuthModule]
})

export class AuthModule {}