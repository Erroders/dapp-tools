import axios from 'axios';

export default async function getNftImage(tokenUrl: string): Promise<string> {
    const res = await axios.get(tokenUrl);

    console.log(res);

    return '';
}
