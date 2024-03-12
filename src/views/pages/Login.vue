<script setup>
import { useAuth, useNotification } from '@/stores'
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router       = useRouter()
const auth         = useAuth();
const errorMessage = ref('');
const notifications= useNotification(); 

const schema = yup.object({
    phone_number: yup.string().required("Phone field is required"),
    password: yup.string().required(),
});

const submit = async(values, {setErrors}) =>{
    const res = await auth.login(values);
    if(res.user){
        router.push({name:'dashboard'});
        notifications.Success("Login Successfully")
    }else{
        setErrors(res);
        errorMessage.value = res;
    }
}
</script>

<template>
    <div class="card card-outline card-primary">
        <div class="card-header text-center">
            <a class="h1"><b>Admin</b>Login</a>
            </div>
            <div class="card-body">
            <p class="login-box-msg">Sign in to start your session</p>

            <Form @submit="submit" :validation-schema="schema" v-slot="{errors, isSubmitting}">
                <div class="input-group">
                    <Field
                        name="phone_number"
                        class="mb-0 form-control"
                        type="text"
                        :class="{'is-invalid' : errors.phone_number || errorMessage != ''}"
                        placeholder="Phone Number"
                    />
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                </div>
                <span class="text-danger mb-3">{{errors.phone_number?errors.phone_number : errorMessage}}</span>

                <div class="input-group mt-3">
                    <Field
                        name="password"
                        class="mb-0 form-control"
                        type="password"
                        :class="{'is-invalid' : errors.password}"
                        placeholder="Password"
                    />
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                        </div>
                    </div>
                </div>
                <span class="text-danger">{{errors.password}}</span>

                <div class="row mt-3
                ">
                <div class="col-7">
                    <div class="icheck-primary">
                        <input type="checkbox" class="mr-2" id="remember">
                        <label for="remember" style="font-weight:400">
                            Remember Me
                        </label>
                    </div>
                </div>
                <!-- /.col -->
                <div class="col-5">
                    <button type="submit" class="btn btn-info btn-block" v-if="isSubmitting"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
                    <button type="submit" class="btn btn-info btn-block" v-else>Sign In</button>
                </div>
                <!-- /.col -->
                </div>
            </Form>

        </div>
        <!-- /.card-body -->
    </div>
</template>


<style scoped>
    .card-primary.card-outline{
        border-top: 3px solid #17A2B8;
    }

</style>
