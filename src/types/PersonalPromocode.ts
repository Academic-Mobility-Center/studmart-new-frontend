export default interface PersonalPromocode{
    student: {
        id: string,
        firstName: string,
        lastName: string,
        university: {
            id: number,
            name: string
        }
    },
    discount: {
        id: string,
        name: string,
        description: string,
        size: number,
        promocodeValue: string | null,
        partner: {
            id: string,
            companyName: string,
            subtitle: string,
            maxDiscount: number,
            isFixed: boolean,
            category: {
                id: number,
                name: string
            }
        },
        hasAllRegions: boolean,
        regions: []
    },
    promocode: string
}
