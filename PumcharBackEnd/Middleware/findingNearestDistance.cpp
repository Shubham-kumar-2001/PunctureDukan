#include <iostream>
#include <algorithm>
#include <vector>
#include <map>
#include <queue>
#include <cmath>
#include <fstream>

using namespace std;

#define pi 3.14159265358979323846
#define radius 6371.0

ifstream list_of_cabs("/Users/babayaga/Desktop/customers3.json");
ofstream recommendations_of_cabs("answer2.json");

double angle_degtorad(double val)
{
	return (val * pi / 180);
}

double ltd1d = 0, long1 = 0;

double calculate_distance(double lat2d, double long2)
{
	double ltd1, lng1, lat2, lng2,
		delta_lon, central_ang;

	ltd1 = angle_degtorad(ltd1d);
	lng1 = angle_degtorad(long1);
	lat2 = angle_degtorad(lat2d);
	lng2 = angle_degtorad(long2);
	// crecommendations_of_cabs<<"ltd1d "<<ltd1<<" long1 "<<long1<<endl;
	delta_lon = lng2 - lng1;

	central_ang = acos(sin(ltd1) *
						   sin(lat2) +
					   cos(ltd1) *
						   cos(lat2) * cos(delta_lon));

	return (radius * central_ang);
}

class cab
{

public:
	long long int length, i, j, x, y, m, n, f, fi, id[100000];
	int cur_id;
	int linecnt, gender;
	// gender=1 for female as female are priority in this algorithm
	char string_latd[1000],
		string_longtd[1000],
		id_as_string[1000], name[1000];

	double lat2d, long2;
	string line, cust_name;
	map<int, int> maptrip;
	map<int, double> maprating;
	map<int, string> mapname;
	map<int, double> mapdist;
	map<int, double> mapval;
	priority_queue<pair<double, int>> priority_customer;
	priority_queue<pair<double, int>, vector<pair<double, int>>, greater<pair<double, int>>> priority_customer_male;
	void distance_calculator()
	{
		int z = calculate_distance(lat2d, long2);
		if (z <= 150) // considering in-city cabs
		{
			// Converting id to int format.
			id[i] = atoll(id_as_string);
			int res = id[i];
			i++;
			double cal = 50 * maprating[res];
			cal = cal - double(z) - (5 * maptrip[res]);
			pair<double, int> prvar;
			prvar.first = cal;
			prvar.second = res;
			mapdist[res] = z;
			mapname[res] = name;
			mapval[res] = cal;
			// crecommendations_of_cabs<<"id "<<res<<" val "<<cal<<endl;
			if (gender)
				priority_customer.push(prvar);
			pair<double, int> prman;
			prman.first = maptrip[res];
			prman.second = res;
			priority_customer_male.push(prman);
		}
	}
	void finalresult()
	{
		int lop = 5;
		while (!priority_customer.empty() && lop-- && gender)
		{
			pair<double, int> res_pr = priority_customer.top();
			priority_customer.pop();
			int res = res_pr.second;
			recommendations_of_cabs << "{\"user_id\": " << res << ", \"name\": " << mapname[res] << " \"distance\": " << mapdist[res];
			recommendations_of_cabs << ", \"rating\": " << maprating[res] << ", \"trips\": " << maptrip[res] << ", \"calculated\": " << mapval[res] << "}" << endl;
		}
		lop = 5;
		recommendations_of_cabs << endl
								<< endl;
		while (!priority_customer_male.empty() && lop--)
		{
			// crecommendations_of_cabs<<"lp "<<lop<<endl;
			pair<double, int> res_pr = priority_customer_male.top();
			priority_customer_male.pop();
			int res = res_pr.second;
			recommendations_of_cabs << "{\"user_id\": " << res << ", \"name\": " << mapname[res] << " \"distance\": " << mapdist[res];
			recommendations_of_cabs << ", \"rating\": " << maprating[res] << ", \"trips\": " << maptrip[res] << "}" << endl;
		}
	}
	void file_paser()
	{
		if (list_of_cabs.is_open())
		{
			linecnt = 0;
			while (getline(list_of_cabs, line))
			{
				// ccrecommendations_of_cabs<<"##"<<line<<endl;

				f = 0;
				x = 0;
				y = 0;
				fi = 0;
				m = 0, n = 0;
				length = line.size();

				if (linecnt == 0)
				{
					// crecommendations_of_cabs<<"If"<<endl;
					for (j = 0; j < length; j++)
					{

						if (line[j] == '"')
							f++;

						else if (line[j] == ':')
							fi++;
						// crecommendations_of_cabs<<"f "<<f<<" fi "<<fi<<endl;

						if (f == 3)
						{
							j++;

							while (line[j] != '"')
							{
								string_latd[x] = line[j];
								x++;
								j++;
							}

							j--;
							string_latd[x] = '\0';
							ltd1d = atof(string_latd);
							// crecommendations_of_cabs<<"++ "<<ltd1d<<endl;
						}

						else if (f == 7)
						{
							j++;

							while (line[j] != '"')
							{
								string_longtd[y] = line[j];
								y++;
								j++;
							}

							j--;
							string_longtd[y] = '\0';
							long1 = atof(string_longtd);
							// crecommendations_of_cabs<<"++ "<<long1<<endl;
						}

						if (fi == 3)
						{
							j += 2;

							while (line[j] != ',')
							{
								name[n] = line[j];
								n++;
								j++;
							}

							j--;
							name[n] = '\0';
							f += 2;
							fi++;
							gender = atoi(name);
						}
						else if (fi == 5)
						{
							j += 2;
							n = 0;
							while (line[j] != '}')
							{
								name[n] = line[j];
								n++;
								j++;
							}

							j--;
							name[n] = '\0';
							f += 2;
							fi++;
							cust_name = name;
						}
					}

					linecnt++;
					if (gender == 1)
						recommendations_of_cabs << "Hi " << cust_name << " (Female) "
												<< " The Listed Cabs as per your needs are :" << endl;
					else
						recommendations_of_cabs << "Hi " << cust_name << " (Male) "
												<< " The Listed Cabs as per your needs are : " << endl;
				}
				else
				{
					// crecommendations_of_cabs<<"else"<<endl;
					for (j = 0; j < length; j++)
					{

						if (line[j] == '"')
							f++;

						else if (line[j] == ':')
							fi++;
						// crecommendations_of_cabs<<"f "<<f<<" fi "<<fi<<endl;
						// To get latitude of the location.
						if (f == 3)
						{
							j++;

							while (line[j] != '"')
							{
								string_latd[x] = line[j];
								x++;
								j++;
							}

							j--;
							string_latd[x] = '\0';
						}

						else if (f == 13)
						{
							j++;

							while (line[j] != '"')
							{
								string_longtd[y] = line[j];
								y++;
								j++;
							}

							j--;
							string_longtd[y] = '\0';
						}

						if (fi == 2)
						{
							j += 2;

							while (line[j] != ',')
							{
								id_as_string[m] = line[j];
								m++;
								j++;
							}

							j--;
							id_as_string[m] = '\0';
							cur_id = atoi(id_as_string);
							// crecommendations_of_cabs<<"$$ "<<cur_id<<endl;
							fi++;
						}

						else if (fi == 4)
						{
							j += 2;

							while (line[j] != ',')
							{
								name[n] = line[j];
								n++;
								j++;
							}

							j--;
							name[n] = '\0';
							f += 2;
							fi++;
						}
						else if (fi == 7)
						{
							j += 2;
							int cnt = 0;
							char a[1000000];
							// crecommendations_of_cabs<<"Entered "<<j<<" fi "<<fi<<endl;
							while (j < length && line[j] != ',')
							{
								a[cnt++] = line[j];
								// crecommendations_of_cabs<<" j "<<j<<endl;
								// crecommendations_of_cabs<<line[j];
								j++;
							}
							// crecommendations_of_cabs<<endl;
							j--;
							a[cnt] = '\0';
							// id.push_back(atoi(name));
							// crecommendations_of_cabs<<"$mapped$ "<<cur_id<<" cnt "<<cnt<<" name "<<atoi(a)<<endl;
							maptrip[cur_id] = atoi(a);
							fi++;
						}
						else if (fi == 9)
						{
							j += 2;
							int cnt = 0;
							char a[1000000];
							// crecommendations_of_cabs<<"Entered "<<j<<" fi "<<fi<<endl;
							while (j < length && line[j] != '}')
							{
								a[cnt++] = line[j];
								// crecommendations_of_cabs<<" j "<<j<<endl;
								// crecommendations_of_cabs<<line[j];
								j++;
							}
							// crecommendations_of_cabs<<endl;
							j--;
							a[cnt] = '\0';
							// rating.push_back(atoi(name));
							// crecommendations_of_cabs<<"$mapped$ "<<cur_id<<" cnt "<<cnt<<" name "<<atof(a)<<endl;
							maprating[cur_id] = atof(a);
							fi++;
						}
					}
					// in string to float.
					lat2d = atof(string_latd);
					long2 = atof(string_longtd);
					distance_calculator();
				}
			}
			finalresult();
		}

		list_of_cabs.close();

		recommendations_of_cabs.close();
	}
};

int cur_id;

int main()
{
	// creating object of the class cab
	cab obj;
	// calling the function
	obj.file_paser();
	return 0;
}
