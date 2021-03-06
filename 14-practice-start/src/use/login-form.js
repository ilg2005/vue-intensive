import {useField, useForm} from "vee-validate";
import {computed, watch} from "vue";
import * as yup from "yup";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export function useLoginForm() {
    const store = useStore();
    const router = useRouter();

    /*const schema = {
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    };*/

    const {handleSubmit, isSubmitting, submitCount } = useForm()

    const isTooManyAttempts = computed(() => submitCount.value > 3)
    watch(isTooManyAttempts, val => {
        if(val) {
            setTimeout( () => submitCount.value = 0, 1500)
        }
    })
    const MIN_LENGTH = 8;

    const {value: email, errorMessage: emailError, handleBlur: emailBlur} = useField('email', yup
        .string()
        .trim()
        .required('Это поле должно быть заполнено')
        .email('Введите валидный mail')
    );

    const {value: password, errorMessage: passwordError, handleBlur: passwordBlur} = useField('password', yup
        .string()
        .trim()
        .required('Это поле должно быть заполнено')
        .min(MIN_LENGTH, `Пароль дожен содержать не менее ${MIN_LENGTH} символов.`)
    );



    const onSubmit = handleSubmit(async values => {
        try {
            await store.dispatch('auth/login', values);
            await router.push('/');
        } catch (e) {
            console.log(e);
        }

    });

    return {
        email, emailError, emailBlur,
        password, passwordError, passwordBlur,
        onSubmit, isSubmitting, isTooManyAttempts
    }

}
