import React from 'react';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import translator from '../Translator/translator';
import Contents from './Contents';

function Layout(props) {

    const queryClient = useQueryClient()


    const fetchData = () => {

        console.log('fetchData :>> ');
    }

    const mutation = useMutation(fetchData, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
        },
    })


    const { status, data, error, refetch, isLoading } = useQuery("myKey", fetchData, {
        manual: true,
    });

    const notify = () => toast("Wow so easy!");


    return (
        <>
            <header>
                <h2>geomanagement2</h2>
            </header>

            <section>
                <div>
                    {/*  NAV  ******************************************* */}
                    <div>
                        <nav>
                            <ul>
                                <Link to="/countries">
                                    <li>
                                        {translator("countries")}
                                    </li>
                                </Link>

                                <Link to="/provinces">
                                    <li>
                                        {translator("provinces")}
                                    </li>
                                </Link>

                                <Link to="/cities">
                                    <li>
                                        {translator("cities")}
                                    </li>
                                </Link>
                            </ul>
                        </nav>
                    </div>

                    {/*  CONTENT  ******************************************* */}

                    <div className="content">
                        <ToastContainer />
                        <Contents />
                    </div>
                </div>
            </section>

            <footer>
                <p>Footer</p>
            </footer>
        </>
    );
}

export default Layout;