import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/input';
import { Button, Link } from '@nextui-org/react';
import { useRegisterMutation } from '../../app/services/userApi';
import { hasErrorFeild } from '../../utils/has-error-field';
import { ErrorMessage } from '../../components/error-message';

type Registers = {
    email: string;
    name: string;
    password: string;
}

type Props = {
    setSelected: (value: string) => void;
}

export const Register: React.FC<Props> = ({
    setSelected
}) => {
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<Registers>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    })

    const [register, { isLoading }] = useRegisterMutation();
    const [error, setError] = useState('');

    const onSubmit = async (data: Registers) => {
        try {
            await register(data).unwrap();
            setSelected('login')
        } catch (error: any) {
  
            if (error && error.data && error.data.error) {
              setError(error.data.error);
            } else {
              setError("An unknown error occurred");
            }
          }
    }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
        control={control}
        name='name'
        label='Name'
        type='text'
        required='Required field'
        />
        <Input
        control={control}
        name='email'
        label='Email'
        type='email'
        required='Required field'
        />
        <Input
        control={control}
        name='password'
        label='Password'
        type='password'
        required='Required field'
        />
        <ErrorMessage error={ error }/>
        <p className="text-center rext-small">
        Already have an account?{' '}
        <Link
        size='sm'
        className='cursor-pointer'
        onPress={() => setSelected('sign-up')}
        >
        Login
        </Link>
        </p>
        <div className="flex g-2 justily-end">
            <Button fullWidth color='primary' type='submit' isLoading={ isLoading }>
                Register
            </Button>
        </div>
    </form>
  )
}