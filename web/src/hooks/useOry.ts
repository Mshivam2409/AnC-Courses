import { PublicApi } from '@ory/kratos-client';
import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { KetoApi } from 'services/keto';
import { SESSION_STATE } from 'store';

const useOry = (kratos: PublicApi, keto: KetoApi): [boolean, boolean, typeof session] => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [session, setSession] = useRecoilState(SESSION_STATE);
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const authorize = async () => {
        await delay(2000);
        try {
            const response = await kratos.whoami(undefined, undefined, {
                withCredentials: true,
            });

            if (response.status === 200) {
                const { role } = await keto.whoami();
                setSession({ ...response.data, role: role });
                setLoading(false);
            } else if (response.status === 401) {
                setLoading(false);
            }
        } catch (error) {
            setError(true);
            setLoading(false);
        }
        console.log("KRTOSSS")
    };

    const checkAccess = useCallback(() => {
        if (session.active) {
            setLoading(false);
        } else {
            authorize();
        }
    }, [session]);

    useEffect(() => {
        checkAccess();
    }, [checkAccess]);

    return [loading, error, session]
}

export default useOry