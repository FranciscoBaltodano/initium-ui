'use client';

import { getCategories, getEventDetails } from '@/services/users';
import { useEffect, useState } from 'react';
import { Loader } from '../ui/loader';

export default function EventDetails() {
    const [eventDetails, seteventDetails] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
        const data = await getEventDetails(localStorage.getItem("userToken"));
        seteventDetails(data);
        } catch (error) {
        console.error("Error fetching event details:", error);
        }finally {
            setLoading(false);
          }
    };

    if (loading) {
        return Loader;
      }

      console.log(eventDetails);
      
      return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Event Details</h1>
          {eventDetails?.length > 0 ? (
            <div className="flex flex-wrap -mx-4">
              {eventDetails.map((event) => (
                <div
                  key={event.id}
                  className="w-full md:w-1/2 lg:w-1/2 px-4 mb-6"
                >
                  <div className="p-4 border rounded-md shadow-md bg-white/30 dark:bg-gray-800/30 border-gray-300 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {event.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      <strong>Start:</strong> {new Date(event.date_start).toLocaleString()}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>End:</strong> {new Date(event.date_end).toLocaleString()}
                    </p>
                    <div className="mt-2">
                      <strong className="text-gray-700 dark:text-gray-300">Categories:</strong>{' '}
                      {event.categories.map((category) => (
                        <span
                          key={category.id}
                          className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-sm px-2 py-1 rounded-md mr-2"
                        >
                          {category.category.name}
                        </span>
                      ))}
                    </div>
                    {event.feedbacks.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-700 dark:text-gray-300">Feedbacks:</h3>
                        <ul className="list-none">
                          {event.feedbacks.map((feedback) => (
                            <li key={feedback.id} className="mt-2">
                              <p className="text-gray-800 dark:text-gray-200">
                                <strong>{feedback.user.firstname} {feedback.user.lastname}:</strong> {feedback.comments}
                              </p>
                              <p className="text-gray-700 dark:text-gray-300">
                                <strong>Rating:</strong> {feedback.rating}/5
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-sm">
                                {new Date(feedback.feedback_date).toLocaleString()}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No events available.</p>
          )}
        </div>
      );
    }      