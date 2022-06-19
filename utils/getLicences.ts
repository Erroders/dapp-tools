import data from '../data/licences.json';

export default function getLicences(): Array<{
    value: string;
    label: string;
}> {
    const licences: Array<{
        value: string;
        label: string;
    }> = data.map((v) => {
        return {
            label: v.name,
            value: v.value,
        };
    });

    return licences;
}
