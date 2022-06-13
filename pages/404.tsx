// 404.js
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '../components/ui/generalComponents';

export default function FourOhFour() {
    const router = useRouter();

    return (
        <>
            <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
                <div className="flex items-center justify-center px-5 text-gray-700">
                    <div className="flex w-1/2 flex-col space-y-2">
                        <div className="font-dark text-7xl font-bold">404</div>
                        <p className="text-2xl font-light leading-normal">Sorry we couldn&apos;t find this page.</p>
                        <p className="mb-8 text-lg">
                            But dont worry, you can find plenty of other things on our homepage.
                        </p>
                        <div className="pt-10 w-1/3">
                            <Button
                                title="Home"
                                onClick={() => {
                                    router.push('/');
                                }}
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <Image
                            src="/warning.svg"
                            width={300 * 2.5}
                            height={200 * 2.5}
                            layout="fixed"
                            className="h-full"
                            alt="No books in shelf"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
